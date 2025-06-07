import { useNavigate, useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { fetchCoctails } from '../../store/coctailSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { Menu } from '../../components';
import { CocktailCard } from '../../widgets/cocktailCard';
import type { Coctail } from '../../models/coctail';
import './styles.css'

const coctailNames = ["margarita", "mojito", "a1", "kir"];

export const CoctailViewPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [cocktailNameSelected, setCocktailNameSelected] = useState<string>();

  const coctails = useSelector<RootState>(state => state.coctails.data) as Coctail[];

  useEffect(() => {
    const cocktailName = searchParams.get('coctail');

    if (!cocktailName) {
      setSearchParams({ coctail: coctailNames[0] })
      return;
    }
    if (cocktailName && !coctailNames.includes(cocktailName)) {
      navigate('/404', { replace: true });
    }
    setCocktailNameSelected(cocktailName ?? '');
    dispatch(fetchCoctails(cocktailName ?? ''));

  }, [searchParams, navigate, dispatch, setSearchParams]);

  const handleMenuItemSelected = (item: string) => {
    setSearchParams({ coctail: item })
  }

  return (
    <div className='responsive-box'>
      <div className="grid-container">
        <div className="col-30">
          <Menu
            selected={cocktailNameSelected}
            items={coctailNames}
            onItemSelected={handleMenuItemSelected} />
        </div>
        <div className="col-70">
          {coctails.map(item => (<CocktailCard key={item.idDrink} cocktail={item} />))}
        </div>
      </div>
    </div>
  )
}

