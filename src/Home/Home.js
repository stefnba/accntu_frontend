import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'antd';
import { useCookies } from 'react-cookie';

export default function Home() {
    const dispatch = useDispatch();
    const { data: userInfo = {} } = useSelector((state) => state.user.userInfo);
    const [cookies] = useCookies('test');

    console.log(cookies);

    useEffect(() => {
        console.log('HOME');
        // dispatch(homeActions.fetchUser())
        //     .then((data) => console.log(data))
        //     .catch((error) => console.log(error.response.status));
    }, [dispatch]);

    return (
        <div>
            <h2>Hello {userInfo.username}</h2>
            <Divider />
            <Link to="/logout">Logout</Link>
        </div>
    );
}
