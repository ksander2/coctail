import React from 'react';
import type { Coctail } from '../../models/coctail';
import './styles.css';

export const CocktailCard: React.FC<{ cocktail: Coctail }> = ({ cocktail }) => {
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}` as keyof Coctail];
      const measure = cocktail[`strMeasure${i}` as keyof Coctail];
      if (ingredient) {
        ingredients.push(
          <li key={i} className="ingredient">
            {measure && <span className="measure">{measure}</span>}
            {ingredient}
          </li>
        );
      }
    }
    return ingredients;
  };

  return (
    <div className="cocktail-card">
      <div className="cocktail-header">
        <h2 className="cocktail-title">{cocktail.strDrink}</h2>
        {cocktail.strDrinkAlternate && (
          <p className="alternate-name">({cocktail.strDrinkAlternate})</p>
        )}
        <div className="meta-info">
          <span className={`alcoholic ${cocktail.strAlcoholic.toLowerCase().replace(' ', '-')}`}>
            {cocktail.strAlcoholic}
          </span>
          <span className="category">{cocktail.strCategory}</span>
          {cocktail.strIBA && <span className="iba">{cocktail.strIBA}</span>}
        </div>
      </div>

      <div className="cocktail-content">
        <div className="image-container">
          <img 
            src={cocktail.strDrinkThumb} 
            alt={cocktail.strDrink} 
            className="cocktail-image"
            loading='lazy'
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-cocktail.png';
            }}
          />
          {cocktail.strImageAttribution && (
            <p className="image-attribution">{cocktail.strImageAttribution}</p>
          )}
        </div>

        <div className="details">
          <div className="glass-type">
            <h3>Glass:</h3>
            <p>{cocktail.strGlass}</p>
          </div>

          <div className="ingredients">
            <h3>Ingredients:</h3>
            <ul className="ingredients-list">{getIngredients()}</ul>
          </div>

          <div className="instructions">
            <h3>Instructions:</h3>
            <p>{cocktail.strInstructions}</p>
            {cocktail.strInstructionsIT && (
              <>
                <h4>Italian:</h4>
                <p>{cocktail.strInstructionsIT}</p>
              </>
            )}
            {cocktail.strInstructionsDE && (
              <>
                <h4>German:</h4>
                <p>{cocktail.strInstructionsDE}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {cocktail.strTags && (
        <div className="tags">
          {cocktail.strTags.split(',').map((tag, index) => (
            <span key={index} className="tag">
              {tag.trim()}
            </span>
          ))}
        </div>
      )}

      <div className="footer">
        <p className="modified-date">
          Last modified: {new Date(cocktail.dateModified).toLocaleDateString()}
        </p>
        {cocktail.strCreativeCommonsConfirmed === 'Yes' && (
          <p className="cc-license">Creative Commons Licensed</p>
        )}
      </div>
    </div>
  );
};
