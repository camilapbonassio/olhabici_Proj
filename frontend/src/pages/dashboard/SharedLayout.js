import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function SharedLayout() {
  return (
    <div>
        <main className='dashboard'>
          

            <div>
                <Navbar />
                <div className='dash-page'>
                    <Outlet />
                </div>
            </div>
        </main>
    </div>
  )
}
