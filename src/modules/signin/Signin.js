import React from "react";
import SigninForm from "../../components/signinform/SigninForm";
import SigninSignupLayout from "../../components/signinSignupLayout/SigninSignupLayout";

const Signin = () => {
  return (
    <div>
      <SigninSignupLayout>
        <SigninForm />
      </SigninSignupLayout>
    </div>
  );
};

export default Signin;
