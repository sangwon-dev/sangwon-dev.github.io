const cityData = [
  { cityName: '서울 - 대한민국', countryCode: 'KR', timezone: 'Asia/Seoul' },
  { cityName: '뉴욕 - 미국', countryCode: 'US', timezone: 'America/New_York' },
  { cityName: '도쿄 - 일본', countryCode: 'JP', timezone: 'Asia/Tokyo' },
  { cityName: '상하이 - 중국', countryCode: 'CN', timezone: 'Asia/Shanghai' },
  { cityName: '타이페이 - 대만', countryCode: 'TW', timezone: 'Asia/Taipei' },
  { cityName: '런던 - 영국', countryCode: 'GB', timezone: 'Europe/London' },
  {
    cityName: '시드니 - 호주',
    countryCode: 'AU',
    timezone: 'Australia/Sydney',
  },
  {
    cityName: '토론토 - 캐나다',
    countryCode: 'CA',
    timezone: 'America/Toronto',
  },
  { cityName: '베를린 - 독일', countryCode: 'DE', timezone: 'Europe/Berlin' },
];

const cityContainer = document.getElementById('city-container');

cityData.forEach((city) => {
  const cityCard = document.createElement('div');
  cityCard.className = 'city-card';
  cityCard.className = `city-card ${city.countryCode}CARD`;

  const cityName = document.createElement('h2');
  cityName.textContent = city.cityName;
  cityCard.appendChild(cityName);

  const cityTime = document.createElement('p');
  cityTime.className = city.countryCode;
  cityCard.appendChild(cityTime);

  cityContainer.appendChild(cityCard);
});

function updateTitle() {
  const countryCode = document.querySelector('.main-card');
  if (countryCode) {
    const city = cityData.find(
      (city) => city.countryCode === countryCode.classList[1].slice(0, -4)
    );
    if (city) {
      const currentTime = getTimeInTimezone(city.timezone);
      document.title = `${currentTime} - ${city.cityName} - 전세계시각`;
    }
  }
}

function updateAllCityTimes() {
  cityData.forEach((city) => {
    const cityTimeElement = document.querySelector(`.${city.countryCode}`);
    cityTimeElement.textContent = getTimeInTimezone(city.timezone);
  });
  updateTitle();
}

function getTimeInTimezone(timezone) {
  const now = new Date();
  const options = {
    timeZone: timezone,
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  return new Intl.DateTimeFormat('ko-KR', options).format(now);
}

// Update time every second (1000ms)
setInterval(updateAllCityTimes, 1000);

async function getCountryCodeFromUserIP() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country;
  } catch (error) {
    console.error('Error fetching country code:', error);
    return null;
  }
}

async function setMainCardForUserCountry() {
  const countryCode = await getCountryCodeFromUserIP();
  if (countryCode) {
    const mainCardElement = document.querySelector(`.${countryCode}CARD`);
    if (mainCardElement) {
      mainCardElement.classList.add('main-card');
    }
  }
}

setMainCardForUserCountry();

// Update times immediately on page load
updateAllCityTimes();
