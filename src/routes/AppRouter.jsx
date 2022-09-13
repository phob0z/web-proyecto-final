import React from 'react'
import { Routes, Route } from 'react-router-dom';

import { Login, App, Forgotpassword, Resetpassword } from '../pages';
import { AuthTemplate } from '../components';
import { AuthProvider } from "../contexts";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { DashboardTemplate } from '../components/templates/DashboardTemplate';
import { ListDirectors } from '../pages/directors/ListDirectors';
import { ShowDirector } from '../pages/directors/ShowDirector';
import { CreateDirector } from '../pages/directors/CreateDirector';
import { UpdateDirector } from '../pages/directors/UpdateDirector';

import { ListReports } from '../pages/reports/ListReports';
import { ShowReport } from '../pages/reports/ShowReport';
import { CreateReport } from '../pages/reports/CreateReport';
import { UpdateReport } from '../pages/reports/UpdateReport';

import { ListJails } from '../pages/jails/ListJails';
import { ShowJail } from '../pages/jails/ShowJail';
import { CreateJail } from '../pages/jails/CreateJail';
import { UpdateJail } from '../pages/jails/UpdateJail';

import { ListWards } from '../pages/wards/ListWards';
import { ShowWard } from '../pages/wards/ShowWard';
import { CreateWard } from '../pages/wards/CreateWard';
import { UpdateWard } from '../pages/wards/UpdateWard';



export const AppRouter = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path='login/*' element={
                    <PublicRoute>
                        <Routes>
                            <Route element={<AuthTemplate />}>
                                <Route path='/*' element={<Login />} />
                            </Route>
                        </Routes>
                    </PublicRoute>
                } />

                <Route path='forgot-password/*' element={
                    <PublicRoute>
                        <Routes>
                            <Route element={<AuthTemplate />}>
                                <Route path='/*' element={<Forgotpassword />} />
                            </Route>
                        </Routes>
                    </PublicRoute>
                } />

                <Route path='reset-password/*' element={
                    <PublicRoute>
                        <Routes>
                            <Route element={<AuthTemplate />}>
                                <Route path='/*' element={<Resetpassword />} />
                            </Route>
                        </Routes>
                    </PublicRoute>
                } />

                <Route path='nosotros/*' element={
                    <PublicRoute>
                        <Routes>
                            <Route element={<AuthTemplate />}>
                                Ruta publica
                            </Route>
                        </Routes>
                    </PublicRoute>
                } />

                <Route path='/*' element={
                    <PrivateRoute>
                        <Routes>
                                <Route element={<DashboardTemplate />}>
                                    <Route index path='/' element={<App />} />
                                    <Route index path='/directors' element={<ListDirectors />} />
                                    <Route index path='/directors/show/:id' element={<ShowDirector />} />
                                    <Route index path='/directors/create' element={<CreateDirector />} />
                                    <Route index path='/directors/edit/:id' element={<UpdateDirector />} />
                                    {/* Reportes */}
                                    <Route index path='/reports' element={<ListReports />} />
                                    <Route index path='/reports/show/:id' element={<ShowReport />} />
                                    <Route index path='/reports/create' element={<CreateReport />} />
                                    <Route index path='/reports/edit/:id' element={<UpdateReport />} />
                                    {/* Jails */}
                                    <Route index path='/jails' element={<ListJails />} />
                                    <Route index path='/jails/show/:id' element={<ShowJail />} />
                                    <Route index path='/jails/create' element={<CreateJail />} />
                                    <Route index path='/jails/edit/:id' element={<UpdateJail />} />
                                    {/* Wards */}
                                    <Route index path='/wards' element={<ListWards />} />
                                    <Route index path='/wards/show/:id' element={<ShowWard />} />
                                    <Route index path='/wards/create' element={<CreateWard />} />
                                    <Route index path='/wards/edit/:id' element={<UpdateWard />} />
                                </Route>
                        </Routes>
                    </PrivateRoute>
                } />
            </Routes>
        </AuthProvider >
    )
}
