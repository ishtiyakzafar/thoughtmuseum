import React from "react";
import SignupForm from "../../components/signupform/SignupForm";
import SigninSignupLayout from "../../components/signinSignupLayout/SigninSignupLayout";

const Signup = () => {
  return (
    <div>
      <SigninSignupLayout>
        <SignupForm />
      </SigninSignupLayout>
    </div>
  );
};

export default Signup;
