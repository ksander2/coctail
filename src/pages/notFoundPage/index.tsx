import { Link } from 'react-router';
import './styles.css';

export const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Oops! Страница не найдена</h2>
        <p className="not-found-text">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <Link to="/" className="not-found-button">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
