class UserData {
    constructor (firstname,familyname,email,password){
        this.firstname = firstname;
        this.familyname = familyname;
        this.email = email;
        this.password = password;

    }
    getFirstName(){
        return this.firstname;
    }
    getFamilyName(){
        return this.familyname;
    }
    getEmail(){
        return this.email;
    }tabUser
    getPassword(){
        return this.password;
    }

}

module.exports ={
    UserData
}