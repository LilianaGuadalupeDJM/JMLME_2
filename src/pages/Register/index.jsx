import React from "react";
import LayoutComponent from "../../components/Layout";
import ImageLogin from '../../components/img/imageLogin.jsx'
import FormRegis from "../../components/FormRegis/index.jsx";

const Register = () => {
    return (
        <LayoutComponent
            leftColSize={{xs:0, sm:0, md:8, lg:6}}
            rightColSize={{xs:24, sm:24, md:16, lg:18}}
            leftContent={<ImageLogin/>}
            rightContent={<FormRegis/>}
        />

    );
}

export default Register;