import Link from 'next/link';

export default function CartCounter() {
  return (
    <div style={{ position: 'relative' }}>
      <Link href="/cart">
            <img className='size-16' src='/assets/shopping-cart.svg' alt="Cart" />
            <span style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '12px',
            }}>
            </span>
      </Link>
    </div>
  );
};
