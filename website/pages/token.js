export const Tokener = () => {
    return  sessionStorage?.getItem("token") || '[Your Rookout Token]';
}

export default Tokener;


