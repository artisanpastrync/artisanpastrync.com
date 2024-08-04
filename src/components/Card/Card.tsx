import React from 'react';
import { createClient } from '@/utils/supabase/server';

type CardProps = {
  imgSrc: string;
  name: string;
  description: string;
  onAddToCart: () => void;
};

const Card: React.FC<CardProps> = ({ imgSrc, name, description, onAddToCart }) => {
    // const supabase = createClient()
    // const { data: products, error } = await supabase.from('products').select('*')
  async function Products() {
    const supabase = createClient();
    const { data: notes } = await supabase.from("notes").select();

    return <pre>{JSON.stringify(notes, null, 2)}</pre>
  }

    return (
        <div className="card">
        <div className="card-img">
            <img src={imgSrc} alt={name} />
        </div>
        <div className="card-content">
            <h3 className="card-name">{name}</h3>
            <p className="card-description">{description}</p>
            <button className="card-button" onClick={onAddToCart}>
            Add to Cart
            </button>
        </div>
        </div>
    );
};

export default Card;
