import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function Guard() {
    const token = useSelector((state) => state.data.token);
    if (token) {
        return <Outlet />
    }
    return <Navigate to="/" />
}

export default Guard