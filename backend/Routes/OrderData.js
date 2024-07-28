import express from 'express';
import Order from '../models/Orders.js'; // Adjusted file name
const router = express.Router();
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date });
    console.log("1231242343242354", req.body.email);

    try {
        let eId = await Order.findOne({ 'email': req.body.email });
        console.log(eId);

        if (eId === null) {
            try {
                console.log(data);
                console.log("1231242343242354", req.body.email);
                await Order.create({
                    email: req.body.email,
                    order_data: [data]
                });
                res.json({ success: true });
            } catch (error) {
                console.error("Error creating order:", error.message);
                res.status(500).send("Server Error");
            }
        } else {
            try {
                await Order.findOneAndUpdate(
                    { email: req.body.email },
                    { $push: { order_data: data } }
                );
                res.json({ success: true });
            } catch (error) {
                console.error("Error updating order:", error.message);
                res.status(500).send("Server Error");
            }
        }
    } catch (error) {
        console.error("Error finding order:", error.message);
        res.status(500).send("Server Error");
    }
});
router.post('/myOrderData', async (req, res) => {
    try {
        //console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
});
export default router;
