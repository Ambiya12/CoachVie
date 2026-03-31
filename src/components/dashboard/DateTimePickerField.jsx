import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../styles/DashboardTabs.module.css';

export default function DateTimePickerField({
  selected,
  onChange,
  mode = 'date',
  ariaLabel,
}) {
  const isTimeMode = mode === 'time';

  return (
    <DatePicker
      selected={selected}
      onChange={(value) => {
        if (value) {
          onChange(value);
        }
      }}
      showTimeSelect={isTimeMode}
      showTimeSelectOnly={isTimeMode}
      timeIntervals={5}
      timeCaption="Heure"
      timeFormat="HH:mm"
      dateFormat={isTimeMode ? 'HH:mm' : 'dd/MM/yyyy'}
      className={`${styles.formInput} ${isTimeMode ? styles.plannerTimeInput : styles.plannerDateInput}`}
      ariaLabelledBy={ariaLabel}
      shouldCloseOnSelect={true}
    />
  );
}
