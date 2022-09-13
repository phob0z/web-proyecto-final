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

export const AppRouter = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path='login/*' element={
                    <PublicRoute>
                        <Routes>
                            <Route element={<AuthTemplate />}>
                                <Route path='/*' element={<Login />} />
                                <Route path='forgot-password/*' element={<Forgotpassword />} />
                                <Route path='reset-password/*' element={<Resetpassword />} />
                            </Route>
                        </Routes>
                    </PublicRoute>
                } />

                <Route path='/*' element={
                    <PublicRoute>
                        <Routes>
                            <Route element={<AuthTemplate />}>
                                <Route path='forgot-password/*' element={<Forgotpassword />} />
                                <Route path='reset-password/*' element={<Resetpassword />} />
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
                                </Route>
                        </Routes>
                    </PrivateRoute>
                } />
            </Routes>
        </AuthProvider >
    )
}
