import React from "react";
import LayoutComponent from "../../components/Layout";
import FormLogin from '../../components/FormLogin/index.jsx'
import ImageLogin from '../../components/img/imageLogin.jsx'

const Login = () => {
    return (
        <LayoutComponent
            leftColSize={{xs:0, sm:0, md:8, lg:6}}
            rightColSize={{xs:24, sm:24, md:16, lg:18}}
            leftContent={<ImageLogin/>}
            rightContent={<FormLogin/>}
        />

    );
}

export default Login;