/* eslint-disable react/no-unstable-nested-components */ /* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */ /* eslint-disable no-alert */
import { useState, useEffect, useRef } from 'react';

import { Space, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';

import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

import { UIContainer } from '../UIContainer';
import { Loader } from '../../Loader';

import UsersService from '../../services/UsersService';

import formatValue from '../../utils/formatValue';
import getFormatedDate from '../../utils/getFormatedDate';

import fallbackImg from '../../assets/images/placeholder.png';

import * as S from './styles';

Chart.register(...registerables);

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search by ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{
              width: 90,
              background: '#268AEF',
              borderColor: '#268AEF',
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    onFilter: (value, record) => {
      const fullName = `${record[dataIndex]?.first}${record[dataIndex]?.last}`;
      const location = `${record[dataIndex]?.city}${record[dataIndex]?.country}`;
      const date = record[dataIndex]?.date && getFormatedDate(record[dataIndex]?.date);

      const nameExists = formatValue(fullName).includes(formatValue(value));
      const locationExists = formatValue(location).includes(formatValue(value));
      const phoneExists = formatValue(record[dataIndex]).includes(formatValue(value));
      const dateExists = date && date.includes(formatValue(value));

      const filterResult = nameExists || locationExists || phoneExists || dateExists;

      return filterResult;
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => (searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{
          backgroundColor: '#ffc069',
          padding: 0,
        }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
    )),
  });

  function handleRemoveUser(uuid) {
    const confirmRemoveUser = window.confirm('Are you sure you want to remove this user?');

    if (confirmRemoveUser) {
      setUsers((prevState) => (
        prevState.filter(({ login }) => login.uuid !== uuid)
      ));
    }
  }

  const usersCountries = users.map(({ location }) => location.country);
  const percentage = usersCountries.reduce((acc, country, _, array) => {
    const total = (acc[country]?.total || 0) + 1;

    return {
      ...acc,
      [country]: {
        country,
        total,
        percent: Math.round(parseFloat(((total * 100) / array.length))),
      },
    };
  }, {});
  const sortedCountries = Object.values(percentage).sort(
    (a, b) => b.percent - a.percent,
  );
  const popularCountries = sortedCountries.slice(0, 5);
  const popularCountriesPercentage = popularCountries.map(({ percent }) => percent);

  const chartLabels = popularCountries.map(({ country }) => country);
  const otherCountries = sortedCountries.slice(5);
  const otherCountriesPercentage = otherCountries.reduce((acc, curr) => acc + curr.percent, 0);

  const columns = [
    {
      title: 'Picture',
      dataIndex: ['picture', 'thumbnail'],
      key: 'picture',
      align: 'center',
      render: (img, user) => (
        <S.Thumbnail
          alt={`${user.name.first} ${user.name.last}`}
          src={img}
          placeholder
          fallback={fallbackImg}
          preview={false}
          style={{ borderRadius: '50%' }}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: ['name'],
      key: 'name',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      width: '22%',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => (a.name.first > b.name.first ? 1 : -1),
      render: (user) => (
        <span>
          {user.first}
          {' '}
          {user.last}
        </span>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      sortDirections: ['ascend', 'descend', 'ascend'],
      width: '25%',
      ...getColumnSearchProps('location'),
      sorter: (a, b) => (a.location.city > b.location.city ? 1 : -1),
      render: (location) => (
        <span>
          {location.city}
          {', '}
          {location.country}
        </span>
      ),
    },
    {
      title: 'Registered',
      dataIndex: ['registered', 'date'],
      key: 'registered',
      sortDirections: ['ascend', 'descend', 'ascend'],
      ...getColumnSearchProps('registered'),
      sorter: (a, b) => (a.registered.date > b.registered.date ? 1 : -1),
      render: (registered) => (
        <span>{getFormatedDate(registered, 'en-IE')}</span>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: '17%',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'center',
      render: (_, user) => (
        <Space size="middle" align="center">
          <S.Button onClick={() => handleRemoveUser(user.login.uuid)}>Delete</S.Button>
        </Space>
      ),
    },
  ];

  const data = {
    labels: [...chartLabels, 'Other countries'],
    datasets: [{
      data: [...popularCountriesPercentage, otherCountriesPercentage],
      backgroundColor: [
        '#5a3FFF',
        '#268AEF',
        '#1ED6FF',
        '#ADE1FF',
        '#F7931A',
        '#3DFFDC',
      ],
      borderColor: [
        '#171C29',
        '#171C29',
        '#171C29',
        '#171C29',
        '#171C29',
        '#171C29',
      ],
      borderWidth: 1,
    }],
  };

  const config = {
    type: 'pie',
    data,
    options: {
      maintainAspectRatio: false,
      responsive: true,
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: false,
          padding: 20,
          boxHeight: 15,
          boxWidth: 15,

          color: '#D5E0E5',
        },
      },
      tooltip: {
        callbacks: {
          label(item) {
            return `${item.label} - ${item.formattedValue}%`;
          },
        },
      },

    },
  };

  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true);

        const { results: usersList } = await UsersService.listUsers(60);

        setUsers(usersList);
      } catch (error) {
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  return (
    <>
      {loading && <Loader loading={loading} />}

      <UIContainer>
        <S.Title>Random users table</S.Title>

        <S.DataTable
          dataSource={users}
          columns={columns}
          rowKey={(user) => user.login.uuid}
          pagination={{
            pageSize: 20,
            defaultCurrent: 1,
            position: ['bottomCenter'],
            showSizeChanger: false,
          }}
        />

        <S.ChartContainer>
          <S.ChartHeader>Users per country</S.ChartHeader>

          <Pie
            data={data}
            options={config}
          />
        </S.ChartContainer>
      </UIContainer>
    </>
  );
}

export { UsersTable };
