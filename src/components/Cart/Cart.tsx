"use client"
import Link from 'next/link';
import useCounter, { useShoppingList }  from './CartContext';
import { useContext } from 'react';

export default function CartIcon() {

    // const { counter } = useCounter();
    const { shoppingList } = useShoppingList();
    return (
        <div style={{ position: 'relative' }}>
        <Link href="/cart">
                <img className='size-16' src='/assets/shopping-cart.svg' alt="Cart" />
            {/* {counter > 0 && ( */}
                <span style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px',
                }}>
                    <h1 className='text-black'>
                        { shoppingList.length }
                        {/* {counter} */}
                    </h1>
                </span>
            {/* )} */}
        </Link>
        </div>
    );
};

