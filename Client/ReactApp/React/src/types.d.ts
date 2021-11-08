declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
declare module "*.json";
declare module '*.scss' {
    const classes: { [key: string]: string };
    export default classes;
}