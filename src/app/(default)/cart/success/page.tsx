import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Stripe from 'stripe';
import { useShoppingList } from '@/components/Cart/CartContext';

type Props = {
  stripeSession: Stripe.Checkout.Session;
};

const Success: React.FC<Props> = ({ stripeSession }) => {
    const { shoppingList } = useShoppingList();

//   useEffect(() => {
//     clearCart();
//   }, [clearCart]);

  return (
    <div>
      <h1>Payment Completed</h1>
    </div>
  );
};

export default Success;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stripeSecret = (process.env.STRIPE_SECRET_KEY as string);
  const stripe = new Stripe(stripeSecret, {
    apiVersion: '2024-06-20',
  });

  const sessionId = context.query.session_id;

  if (typeof sessionId !== 'string') {
    return {
      notFound: true,
    };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product'],
    });

    return {
      props: {
        stripeSession: session,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
