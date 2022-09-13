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
                                    <Route index path='/reports' element={<ListReports />} />
                                    <Route index path='/reports/show/:id' element={<ShowReport />} />
                                    <Route index path='/reports/create' element={<CreateReport />} />
                                    <Route index path='/reports/edit/:id' element={<UpdateReport />} />

                                </Route>
                        </Routes>
                    </PrivateRoute>
                } />
            </Routes>
        </AuthProvider >
    )
}
