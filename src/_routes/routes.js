import NotFound404 from './NotFound404';
import {
    Logout,
    Login,
    Signup,
    SignupValidation,
} from '../Auth';
import { Home, HomePublic } from '../Home';
import { SettingsCenter } from '../Settings';
import { Transaction } from '../Transaction';
import { Importing } from '../Import';
import { Budget } from '../Budget';
import { UserProfile } from '../Settings/User';
import { SecurityCenter } from '../Settings/Security';


const routes = [
    {
        title: 'Home',
        path: ['/', '/home'],
        exact: true,
        component: Home,
        isPrivate: true,
        hasPageHeader: true,
        breadcrumbs: [
            { breadcrumbName: 'Home', path: '/' },
            { breadcrumbName: 'Dashboard', path: '/dashboard' },
        ],
    },
    {
        title: 'Transactions',
        path: ['/transactions'],
        exact: true,
        component: Transaction,
        isPrivate: true,
        hasPageHeader: true,
        // pageHeaderExtra: TableActionNav,
        breadcrumbs: [
            { breadcrumbName: 'Home', path: '/' },
            { breadcrumbName: 'Transactions', path: '/transactions' },
        ],
    },
    {
        title: 'Import new Transactions',
        path: ['/import'],
        exact: true,
        component: Importing,
        isPrivate: true,
        hasPageHeader: true,
        // pageHeaderExtra: TableActionNav,
        breadcrumbs: [
            { breadcrumbName: 'Home', path: '/' },
            { breadcrumbName: 'Transactions', path: '/import' },
        ],
    },
    {
        title: 'Budget',
        path: ['/budget'],
        exact: true,
        component: Budget,
        isPrivate: true,
        hasPageHeader: true,
        breadcrumbs: [
            { breadcrumbName: 'Home', path: '/' },
            { breadcrumbName: 'Budget', path: '/budget' },
        ],
    },
    {
        title: 'Account Center',
        path: ['/settings', '/settings/*'],
        exact: true,
        component: SettingsCenter,
        isPrivate: true,
        hasPageHeader: true,
        breadcrumbs: [
            { breadcrumbName: 'Home', path: '/' },
            { breadcrumbName: 'Account Center', path: '/settings' },
        ],
        subRoutes: [
            {
                title: 'User Profile',
                path: '/settings/user',
                component: UserProfile,
            },
            {
                title: 'Settings',
                path: '/settings/security',
                component: SecurityCenter,
            },
        ],
    },
    {
        title: 'Home Public',
        path: ['/', '/home'],
        exact: true,
        component: HomePublic,
        isPrivate: false,
    },
    {
        title: 'Logout',
        path: '/logout',
        exact: true,
        component: Logout,
        isPrivate: true,
    },
    {
        title: 'Login',
        path: '/login',
        exact: true,
        component: Login,
    },
    {
        title: 'Singup',
        path: '/signup',
        exact: true,
        component: Signup,
    },
    {
        // title: 'Singup ',
        path: '/signup/validate/:validationKey',
        exact: true,
        component: SignupValidation,
    },
];

export default [
    ...routes,
    {
        path: '*',
        component: NotFound404,
    },
];
