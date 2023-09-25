class Customer {
    constructor(body) {
      if (body) {
        if (Array.isArray(body)) {
          this.customers = body;
        } else {
          const { firstName, lastName, email, country, segment, isVerified, _id, customerId } = body;
          this._id = customerId || _id;
          this.firstName = firstName;
          this.lastName = lastName;
          this.segment = segment;
          this.email = email;
          this.country = country;
          this.isVerified = isVerified;
        }
      }
    }
  
    getData() {
      if (this.customers) {
        return this.customers;
      }
  
      const data = {}
      
      if (this._id) {
        data._id = this._id;
      }
      if (this.email) {
        data.email = this.email;
      }
      if (this.country) {
        data.country = this.country;
      }
      if (this.segment) {
        data.segment = this.segment;
      }
      if (this.firstName) {
        data.firstName = this.firstName;
      }
      if (this.lastName) {
        data.lastName = this.lastName;
      }

      if (typeof this.isVerified === 'boolean' || this.isVerified === 'true' || this.isVerified === 'false') {
        data.isVerified = this.isVerified === 'true' ? true : this.isVerified === 'false' ? false : this.isVerified;
      }
  
      return Object.keys(data).length ? data : null;
    }
  
    getRaw() {
      if (this.customers) {
        return this.customers;
      }
  
      const data = {}
      
      if (this._id) {
        data._id = this._id;
      }
      if (this.email) {
        data.email = this.email;
      }
      if (this.country) {
        data.country = this.country;
      }
      if (this.segment) {
        data.segment = this.segment;
      }
      if (this.firstName) {
        data.firstName = this.firstName;
      }
      if (this.lastName) {
        data.lastName = this.lastName;
      }

      if (typeof this.isVerified === 'boolean' || this.isVerified === 'true' || this.isVerified === 'false') {
        data.isVerified = this.isVerified === 'true' ? true : this.isVerified === 'false' ? false : this.isVerified;
      }
  
      return Object.keys(data).length ? data : null;
    }
  }
  
  export const getParsed = (body) => new Customer(body).getData();
  export const getRaw = (body) => new Customer(body).getRaw();