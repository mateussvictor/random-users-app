import styled from 'styled-components';
import { Table, Image } from 'antd';

export const Title = styled.h1`
  margin-bottom: 2.4rem;
  color: #F2F4F5;
  text-align: center;
  font-size: 2.4rem;
  font-weight: bold;
`;

export const DataTable = styled(Table)`
  padding: .8rem;

  & .ant-table-cell.ant-table-column-sort {
    background: #222838;
  }

  .ant-table-thead > tr > th {
    color: #F2F4F5;
    font-weight: bold;
    background: #222838;
    border-bottom: 1px solid #383C4F;
  }

  .ant-table-thead > tr > th:hover {
    background: #1c2333 !important;
  }

  tbody > tr:hover > td {
    background: #1c2333 !important;
  }

  tr > td:last-of-type {
  }

  .ant-table-tbody {
    color: #F2F4F5;
    background: #252E43;
  }

  .ant-table-tbody > tr > td {
    border-color: #383C4F;
  }

  .ant-table-tbody >tr > td.ant-table-cell-row-hover {
    background: inherit;
  }

  .ant-pagination-item-container {
    display: none;
  }

  & .ant-pagination-item-link {
    background: transparent;
    border: 1px solid #F2F4F5;

    &:hover {
      svg {
        fill: #268AEF;
      }
    }

    svg {
      fill: #F2F4F5;
    }
  }

  & .ant-pagination-prev.ant-pagination-disabled,
  & .ant-pagination-next.ant-pagination-disabled{
    background: #E8E8E8;

    svg {
      fill: #A8AAAF;
    }
  }

  & .ant-pagination-item.ant-pagination-item-active {
    background: #268AEF;
    font-weight: bold;
  }

  & .ant-pagination-item.ant-pagination-item-active a {
    color: #F2F4F5;
    font-weight: bold;
  }

  & .ant-pagination-item {
    background: transparent;
    border: 1px solid #268AEF;
  }

  & .ant-pagination-item a {
    color: #268AEF;
  }

  @media screen and (max-width: 800px) {
    th.ant-table-cell {
      padding: .8rem;
    }

    td.ant-table-cell {
      padding: .4rem;
    }
  }
`;

export const Button = styled.button.attrs({ type: 'button' })`
  border: 0;
  outline: 0;
  color: #fba338;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  transition: color .3s;
  -webkit-text-decoration-skip: objects;

  &:hover {
    color: #F2F4F5
  }
`;

export const Thumbnail = styled(Image)`
  width: 3.6rem;
  height: 3.6rem;
`;

export const ChartContainer = styled.div`
  width: 400px;
  height: 500px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 4rem;

  @media screen and (max-width: 540px) {
    width: 300px;
    height: 400px;
  }
`;

export const ChartHeader = styled.h2`
  margin-bottom: 2.4rem;
  color: #F2F4F5;
  font-weight: bold;
`;
