/* eslint-disable no-useless-escape */
export default function formatSearchedValue(value) {
  const regex = /[.,\#!$%^&*;:{}='\_`~]/g;

  return value.toString().trim().toLowerCase().replace(regex, '');
}
