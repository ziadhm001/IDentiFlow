export const verficationHTML = (otp) => 
`
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <tr>
        <td align="center">
        <table border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); margin: 20px;">
            <tr>
            <td align="center" style="padding: 40px;">
                <img src="cid:checkpeas" alt="Checkpeas Logo" style="display: block; margin: 0 auto;"/>
                <p style="font-size: 18px; color: #333; margin-top: 20px;">Thanks for verifying your email</p>
                <p style="font-size: 18px; color: #333;">Here is your one time password</p>
                <p style="font-size: 30px; color: #007bff; font-weight: bold;">${otp}</p>
            </td> 
            </tr>
        </table>
        </td>
    </tr>
    </table>
`