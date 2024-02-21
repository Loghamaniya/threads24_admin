const express=require('express')
const nodemailer = require("nodemailer");
const router=express.Router()
const Approval = require("../models/approvalmodel");
const Detail=require("../models/detailmodel");
const Count=require("../models/countmodel");





router.get('/',(req,res)=>{
    // console.log(req);
    Approval.find()
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
    
})

router.post("/del",async(req,res)=>{
    const{email}=req.body;
    console.log(email);
    await Approval.deleteOne({email:email});
    res.json({msgg:"Deleted Successfully"})
})






router.post("/add", async (req, res) => {
    
      const {email} = req.body;
      console.log(email);
      const duser=await Detail.findOne( { "email": email } );
      const puser=await Approval.findOne({ "email": email });
      console.log(puser);
      console.log(puser.UPI_id);
      let workshop=puser.selectedWorkshops;
      if(duser)
      {
        console.log(puser.UPI_id);
        if((duser.selectedEvents=='false') && (puser.selectedEvents=='true'))
        {
            console.log("wwwwwwww");
            const mes=await Detail.updateOne({email: email}, {$set:{upievent:puser.UPI_id,selectedEvents:puser.selectedEvents}});
        }
        if((duser.selectedWorkshops=='false') &&(puser.selectedWorkshops!='false'))
        {
            if(workshop=='uiux')
            {
                await Count.updateOne({_id:"65c9f395fde61a170c9bff55"}, { $inc: { uiux: 1} });
            }
            else if(workshop=='flutter')
            {
                await Count.updateOne({_id:"65c9f395fde61a170c9bff55"}, { $inc: { flutter: 1} });
            }
            else if(workshop=='web_development')
            {
                await Count.updateOne({_id:"65c9f395fde61a170c9bff55"}, { $inc: { web: 1} });
            }
            else{
                await Count.updateOne({_id:"65c9f395fde61a170c9bff55"}, { $inc: { cyber: 1} });
            }
            console.log("eeeee");
            const mes=await Detail.updateOne({email: email}, {$set:{upiworkshop:puser.UPI_id,selectedWorkshops:puser.selectedWorkshops}});
        }

        
        
      }
      else{
        const {
            name,
            department,
            selectedCollege,
            email,
            number,
            selectedEvents,
            selectedWorkshops,
            selectedYear,
            UPI_id
          } = puser;
        console.log(UPI_id);
        const adder = await Detail.create({
            name,
            department,
            selectedCollege,
            email,
            number,
            selectedEvents,
            selectedWorkshops,
            selectedYear,
          });
          console.log(adder);

        if(puser.selectedEvents=='true')
        {
            console.log("wwwwwwww");
            const mes=await Detail.updateOne({email: email}, {$set:{upievent:UPI_id}});
        }
        if(puser.selectedWorkshops!='false')
        {
            console.log("eeeee");
            // const count=await Count.findOne({_id:"65c9ed76fde61a170c9bff54"});
            
            
            const mes=await Detail.updateOne({email: email}, {$set:{upiworkshop:UPI_id}});
            // const co=await Count.updateOne({_id:"65c9ed76fde61a170c9bff54"},)
            if(workshop=='uiux')
            {
                await Count.updateOne({_id:"65c9f395fde61a170c9bff55"}, { $inc: { uiux: 1} });
            }
            else if(workshop=='flutter')
            {
                await Count.updateOne({_id:"65c9f395fde61a170c9bff55"}, { $inc: { flutter: 1} });
            }
            else if(workshop=='web_development')
            {
                await Count.updateOne({_id:"65c9f395fde61a170c9bff55"}, { $inc: { web: 1} });
            }
            else{
                await Count.updateOne({_id:"65c9f395fde61a170c9bff55"}, { $inc: { cyber: 1} });
            }
            
        }


      }
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL, // generated ethereal email
          pass: process.env.PASS, // generated ethereal password
        },
      });
  
      var mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "THREADS_24",
        html: `
        <html>
      <head>
        
      </head>
      <body>
      <h3>Dear ${puser.name},<h3><br></br>

        <div>We are delighted to confirm that your information has been successfully verified on our website. As a result, we are pleased to provide you with access to <b>download your ID card <b>from our platform. Please ensure to keep your ID card safe and secure.</div>
        
        <p>At Sona College of Technology, we prioritize the accuracy and security of our members' information. Be assured that we have taken all necessary steps to safeguard your privacy and confidentiality.</p>
        
        <p>Thank you for opting to join our event and workshop. We anticipate further collaboration with you in the future.</p>
        
        <p>Best regards,</p>
        <p>Thread'24</p>
        <p>Department of Computer Science Engineering</p>
        <p>Sona College of Technology</P>
      </body>
    </html>
        
        `,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(400).json(error);
          console.log(error);
        } else {
          console.log("Email sent: ");
        }
      });

      await Approval.deleteOne({email:email});
       
      res.json({msgg:"Registration completed"})
        
   
  
  });


module.exports=router