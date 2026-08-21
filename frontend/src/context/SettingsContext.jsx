import { createContext, useContext, useState, useEffect } from 'react';
import { settingsAPI } from '../services/api';

const SettingsContext = createContext(null);

const defaultSettings = {
  businessName: 'PixNGiggles',
  tagline: 'Turn Moments Into Memories',
  phone: '817-751-7818',
  email: 'info@pixngiggles.com',
  website: 'pixngiggles.com',
  serviceArea: 'Dallas–Fort Worth, TX and surrounding areas',
  socialLinks: {
    facebook: 'https://facebook.com/pixngiggles',
    instagram: 'https://instagram.com/pixngiggles',
    whatsapp: 'https://wa.me/18177517818',
  },
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    settingsAPI.get()
      .then(({ data }) => setSettings(data.data))
      .catch(() => setSettings(defaultSettings))
      .finally(() => setLoading(false));
  }, []);

  const refreshSettings = async () => {
    const { data } = await settingsAPI.get();
    setSettings(data.data);
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
