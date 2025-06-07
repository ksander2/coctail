import type { FC } from 'react';
import './styles.css'

type MenuProps = {
    items: string[];
    onItemSelected: (item: string) => void;
    selected?: string;
}

export const Menu: FC<MenuProps> = ({ items, onItemSelected, selected }) => {
    return (
        <div className='menu-container'>
            <ul className="menu-list">
                {items.map(item => {
                    return (
                        <li key={item} className="menu-item">
                            <div className={`menu-item-block ${selected === item ? 'active' : null}`}
                                onClick={() => onItemSelected(item)}>{item}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
