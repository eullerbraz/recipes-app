import React, { useState } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import Card from '../components/CardItems';
import useRecipes from '../hooks/useRecipes';
import useCategories from '../hooks/useCategories';
import Footer from '../components/Footer';

export default function Drinks() {
  const drinks = useSelector((state) => state.recipes.recipes);
  const categories = [
    { strCategory: 'All' },
    ...useSelector((state) => state.recipes.categories),
  ];
  const [showSearchBar, setShowSearchBar] = useState(false);
  const location = useLocation();
  const currentPage = location.pathname;
  const history = useHistory();
  const [redirectToDetails, setRedirectToDetails] = useState(false);

  const {
    setInputValue,
    setFilterIngredient,
    setFilterName,
    setFilterFirstLetter,
    setSearched,
    inputValue,
  } = useRecipes(setRedirectToDetails);

  const { filterCategory, setFilterCategory } = useCategories(setRedirectToDetails);

  const handleClickSearch = async (e) => {
    e.preventDefault();
    setSearched(true);
  };

  const handleClickFilter = (category) => {
    if (category !== filterCategory) {
      setFilterCategory(category);
    } else {
      setFilterCategory('All');
    }
  };

  const handleClickCard = (id) => {
    history.push(`${currentPage}/${id}`);
  };

  return (
    <section
      className="body"
    >
      <Header
        onClickShowInput={ () => setShowSearchBar((prevShow) => !prevShow) }
        pageTitle="Bebidas"
      />
      {showSearchBar ? (
        <SearchBar
          handleChange={ (e) => setInputValue(e) }
          setIngredientValue={ setFilterIngredient }
          setNameValue={ setFilterName }
          setLetterValue={ setFilterFirstLetter }
          handleClick={ handleClickSearch }
          inputValue={ inputValue }
        />
      ) : null}
      <Categories
        categories={ categories }
        onClick={ handleClickFilter }
      />
      {redirectToDetails ? (
        drinks.map(({ idDrink }) => (
          <Redirect key={ idDrink } to={ `${currentPage}/${idDrink}` } />
        ))
      ) : null}
      {
        drinks.map((drink, index) => (
          <Card
            key={ drink.idDrink }
            id={ drink.idDrink }
            title={ drink.strDrink }
            thumb={ drink.strDrinkThumb }
            onClick={ () => handleClickCard(drink.idDrink) }
            type="recipe"
            index={ index }
          />
        ))
      }
      <Footer />
    </section>
  );
}
