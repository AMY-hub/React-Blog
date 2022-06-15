declare module "*.jpg" {
    const value: any;
    export default value;
};
declare module "*.png" {
    const value: any;
    export default value;
};
declare module "*.jpeg" {
    const value: any;
    export default value;
};
declare module "*.gif" {
    const value: any;
    export default value;
};

declare module "*.svg" {
    import React from "react";
    export const ReactComponent: React.SFCFactory<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
};

declare module "*.module.css";
declare module "*.module.scss";