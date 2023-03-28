declare module "*.css" {
  const styles: { [key: string]: string };
  export = styles;
}

declare module "*.jpeg";

declare module "*.png";

declare module "*.svg" {
  const path: string;
  export default path;
}
