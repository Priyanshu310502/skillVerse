const { default: mongoose } = require("mongoose");

// const CourseModel=require('../model/Course.js')
const CapturePayment = async (req, res) => {
    try {
        // fetch courseId , userId 
        const { courseId } = req.body;
        const userId = req.user.id;
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required"
            });
        }
        // fetch course details from course collection
        const courseDetails = await CourseModel.findById(courseId);
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }
        const uID = mongoose.Schema.Types.ObjectId(userId);
        // check if user is enrolled in the course
        if (courseDetails.studentsEnrolled.includes(uID)) {
            return res({
                success: false,
                message: "User is already enrolled in this course"
            })
        }
        // order Create
        const amount = courseDetails.price;
        const currency = "INR";
        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId: courseId, userId
            },
            receipt_email: req.user.email,
            payment_capture: true,
            return_url: `${process.env.BASE_URL}/course/${courseId}/payment/success`,
            cancel_url: `${process.env.BASE_URL}/course/${courseId}/payment/cancel`,
        }

        try {
            // Initiate Payment Using RazorPay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse)
            res.json({
                success: true,
                message: "Payment Initiated",
                courseName: courseDetails.courseName,
                courseDescription: courseDetails.courseDescription,
                thumbnal: courseDetails.thumbnal,
                amount: paymentResponse.amount,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                // extra
                paymentId: paymentResponse.id,
                options: options,
                paymentResponse
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Payment Gateway Error"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.messag
        });

    }
}

const verifySignature = async (req, res) => {
    try {
        const webhooksecret = "123456";
        const signature = req.headers['x-razorpay-signature'];
        const shasum = crypto.createHmac("sha256", webhooksecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");
        if (digest == signature) {
            console.log("signature verified")

            // process payment
            res.status(200).json({
                success: true,
                message: "Webhook Signature verified"
            })
        } else {
            console.log("signature not verified")
            res.status(400).json({
                success: false,
                message: "Webhook Signature not verified"
            })
        }
        const { courseId, userId } = req.body.payload.payment.entity.notes;
        try {
            // update course details in course collection
            const enrolledCourse = await CourseModel.findByIdAndUpdate({
                _id: courseId
            }, {
                $push: {
                    // studentsEnrolled: mongoose.Types.ObjectId(userId)
                    studentsEnrolled: userId
                }
            }, {
                new: true
            });
            if (!enrolledCourse) {
                return res.status(404).json({
                    success: false,
                    message: "Course not found"
                });
            }
            // update course in user
            const updateUser = await UserModel.findByIdAndUpdate({
                _id: userId
            }, {
                $push: {
                    course: courseId
                }
            }, {
                new: true
            });
            if (!updateUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            };
            // send email to user and instructor about the successful payment
            const sendmail = await sendMailer(
                updateUser.email,
                'Payment Successful',
                `Payment of ${enrolledCourse.courseName} has been successful. Course Details: Course Name - ${enrolledCourse.courseName}, Course Description - ${enrolledCourse.courseDescription}, Course Price - ${enrolledCourse.price} INR`,
            )
            console.log(sendmail);
            res.status(200).json({
                success: true,
                message: "Payment Successful",
                course: enrolledCourse,
                user: updateUser
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: error.messag
            });

        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.messag
        });

    }
}
module.exports = { CapturePayment, verifySignature }