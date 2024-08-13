import React from 'react';

interface Sprite {
  image: 'ped' | 'chi'; // Updated to reflect dropdown options
  animation: string;
}

interface SettingsProps {
  settings: {
    title: string;
    subtitle: string; // Added subtitle
    sprites: Sprite[];
    fallSpeed: number;
    delayBetweenSpeed: number;
    difficulty: 'easy' | 'medium' | 'hard'; // Added difficulty
  };
  setSettings: React.Dispatch<React.SetStateAction<any>>;
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: 'bold',
};

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '8px',
  marginBottom: '16px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const selectStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '8px',
  marginBottom: '16px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const containerStyle: React.CSSProperties = {
  padding: '16px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

export const Settings: React.FC<SettingsProps> = ({
  settings,
  setSettings,
}) => {
  const handleChangeSprite = (index: number, field: string, value: any) => {
    setSettings((prevSettings: any) => {
      const newSprites = [...prevSettings.sprites];
      newSprites[index] = { ...newSprites[index], [field]: value };
      return { ...prevSettings, sprites: newSprites };
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>
        Title:
        <input
          type="text"
          name="title"
          value={settings.title}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        Subtitle:
        <input
          type="text"
          name="subtitle"
          value={settings.subtitle}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>
      <div>
        <label style={labelStyle}>Sprites:</label>
        {settings.sprites.map((sprite, index) => (
          <div key={index} style={{ marginBottom: '16px' }}>
            <div>Sprite {index}</div>
            <label style={labelStyle}>
              Image:
              <select
                value={sprite.image}
                onChange={(e) =>
                  handleChangeSprite(index, 'image', e.target.value)
                }
                style={selectStyle}
              >
                <option value="ped">Ped</option>
                <option value="chi">Chi</option>
              </select>
            </label>
            <label style={labelStyle}>
              Animation:
              <select
                value={sprite.animation}
                onChange={(e) =>
                  handleChangeSprite(index, 'animation', e.target.value)
                }
                style={selectStyle}
              >
                <option value="straight">Straight</option>
                <option value="curved">Curved</option>
                <option value="zigzag">Zigzag</option>
                <option value="bounce">Bounce</option>
                <option value="fade">Fade</option>
                {/* Add more options as needed */}
              </select>
            </label>
          </div>
        ))}
        <button
          onClick={() =>
            setSettings((prevSettings) => ({
              ...prevSettings,
              sprites: [
                ...prevSettings.sprites,
                { image: 'ped', animation: 'straight' },
              ],
            }))
          }
          style={{ padding: '8px 16px', marginTop: '16px' }}
        >
          Add Sprite
        </button>
      </div>
      <label style={labelStyle}>
        Fall Speed:
        <input
          type="number"
          name="fallSpeed"
          value={settings.fallSpeed}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        Delay Between Speed:
        <input
          type="number"
          name="delayBetweenSpeed"
          value={settings.delayBetweenSpeed}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        Difficulty:
        <select
          name="difficulty"
          value={settings.difficulty}
          onChange={handleChange}
          style={selectStyle}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
    </div>
  );
};
