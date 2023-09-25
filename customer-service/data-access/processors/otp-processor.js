class OTP {
    constructor(body) {
      console.log(body)
      if (body) {
          if(Array.isArray(body))
          {
            const { otp, email, createdAt } = body[0];
            this.email = email;
            this.otp = otp;
            this.createdAt = createdAt;
          }
          else{
            const { otp, email, createdAt } = body;
            this.email = email;
            this.otp = otp;
            this.createdAt = createdAt;
          }
        }
    }
  
    getData() {
      const data = {};

      if (this.email) {
        data.email = this.email;
      }
      
      if (this.otp) {
        data.otp = this.otp;
      }
      
      if (this.createdAt) {
        data.createdAt = this.createdAt;
      }
      
      return Object.keys(data).length ? data : null;
    }
  
    getRaw() {
      const data = {};

      if (this.email) {
        data.email = this.email;
      }
      
      if (this.otp) {
        data.otp = this.otp;
      }
      
      if (this.createdAt) {
        data.createdAt = this.createdAt;
      }

        return Object.keys(data).length ? data : null;
      }
  }
  
  export const getParsed = (body) => new OTP(body).getData();
  export const getRaw = (body) => new OTP(body).getRaw();