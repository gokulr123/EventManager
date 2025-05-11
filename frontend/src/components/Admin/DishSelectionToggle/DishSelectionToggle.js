import React, { useState ,useEffect} from 'react';
import './DishSelectionToggle.css'; 
import axios from '../../../Services/Api';

const togglesList = [
    { label: 'Saravana - Beverages', restaurantName: 'Saravana bhavan', dishType: 'Beverage' },
    { label: 'Saravana - Foods', restaurantName: 'Saravana bhavan', dishType: 'Food' },
    { label: 'Supreme Bakers - Beverages', restaurantName: 'supreme bakers', dishType: 'Beverage' },
    { label: 'Supreme Bakers - Foods', restaurantName: 'supreme bakers', dishType: 'Food' },
    { label: 'Kaffeehaus - Beverages', restaurantName: 'Kaffeehaus', dishType: 'Beverage' },
    { label: 'Kaffeehaus - Foods', restaurantName: 'Kaffeehaus', dishType: 'Food' },
    { label: 'mamta food - Beverages', restaurantName: 'mamta food', dishType: 'Beverage' },
    { label: 'mamta food - Foods', restaurantName: 'mamta food', dishType: 'Food' },
    { label: 'Malabar Quissa - Beverages', restaurantName: 'malabar quissa', dishType: 'Beverage' },
    { label: 'Malabar Quissa - Foods', restaurantName: 'malabar quissa', dishType: 'Food' },
    { label: 'Southern Delight - Beverages', restaurantName: 'southern delight', dishType: 'Beverage' },
    { label: 'Southern Delight - Foods', restaurantName: 'southern delight', dishType: 'Food' },
    { label: 'Cococane Juicery - Beverages', restaurantName: 'cococane juicery', dishType: 'Beverage' },
    { label: 'Cococane Juicery - Foods', restaurantName: 'cococane juicery', dishType: 'Food' }
  ];
  

const DishSelectionToggle = ({ onChange }) => {
  useEffect(() => {
    const fetchActiveStatus = async () => {
      try {
        const res = await axios.get('/api/dishes/active-status'); // call your backend endpoint
        const { data } = res;

        // Convert backend data to the toggle object structure
        const updatedToggles = {};
        togglesList.forEach(item => {
          const match = data.find(
            d => d.restaurantName === item.restaurantName && d.dishType === item.dishType
          );
          updatedToggles[item.label] = match?.active || false;
        });

        setToggles(updatedToggles);
      } catch (err) {
        console.error('Error fetching active status', err);
      }
    };

    fetchActiveStatus();
  }, []);
    const [toggles, setToggles] = useState({
        'Saravana - Beverages': false,
        'Saravana - Foods': false,
        'Italian - Beverages': false,
        'Italian - Foods': false,
        'Kaffeehaus - Beverages':false,
        'Kaffeehaus - Foods':false,
        'mamta food - Beverages':false,
        'mamta food - Foods':false,
        'Supreme Bakers - Beverages':false,
        'Supreme Bakers - Foods':false,
        'Malabar Quissa - Beverages':false,
        'Malabar Quissa - Foods':false,
        'Cococane Juicery - Beverages':false,
        'Cococane Juicery - Foods':false,
        'Southern Delight - Beverages':false,
        'Southern Delight - Foods':false,
      });
    
      const handleToggleChange = async (key, restaurantName, dishType) => {
        const newState = !toggles[key];
        setToggles(prev => ({ ...prev, [key]: newState }));
    
        try {
          const url = `/api/dishes/${newState ? 'activate' : 'deactivate'}`;
          await axios.put(url, {
            restaurantName,
            dishType
          });
          console.log(`${newState ? 'Activated' : 'Deactivated'} ${key}`);
        } catch (error) {
          console.error(`Failed to ${newState ? 'activate' : 'deactivate'} ${key}`, error);
        }
      };
    
      return (
        <div className="toggle-group">
      {togglesList.map(item => (
        <label className="toggle" key={item.label}>
          <input
            type="checkbox"
            checked={toggles[item.label]}
            onChange={() =>
              handleToggleChange(item.label, item.restaurantName, item.dishType)
            }
          />
          <span className="slider"></span>
          <span className="label-text">{item.label}</span>
        </label>
      ))}
    </div>
      );
    };

export default DishSelectionToggle;
