import React, { useState, useEffect } from "react";
import { fetchDates } from "../data/useDates";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { pl } from 'date-fns/locale';
import { isSameDay } from 'date-fns';
import { Badge } from '@mui/material';
import { PickersDay } from '@mui/x-date-pickers';

const Calendar = () => {
    const [highlightedDates, setHighlightedDates] = useState([]);

    useEffect(() => {
        const loadDates = async () => {
            const data = await fetchDates();
            const parsed = data.map((date) => {
                const [d, m, y] = date.split('.');
                return new Date(`${y}-${m}-${d}`);
            });
            setHighlightedDates(parsed);
        };

        loadDates();
    }, []);

    return (<>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
            <DateCalendar
                views={['year', 'month', 'day']}
                slots={{ day: CustomDay }}
                slotProps={{ day: { highlightedDates } }}
                sx={{
                    fontSize: '0.8rem',
                    height: 'auto',
                    width: 'auto',
                    color: 'var(--color-base-content)', // Цвет текста
                    '& .MuiPickersDay-root': {
                        color: 'var(--color-base-content)', // Обычные дни
                    },
                    '& .MuiTypography-root': {
                        color: 'var(--color-base-content)', // Месяц/год в заголовке
                    },
                    '& .MuiSvgIcon-root': {
                        color: 'var(--color-base-content)', // Иконки переключения месяцев
                    },
                    '& .MuiDayPicker-Day': {
                        fontSize: '0.8rem',
                    },
                    '& .MuiPickersDay-root.Mui-selected': {
                        backgroundColor: 'var(--color-secondary)',
                        color: 'var(--color-secondary-content)',
                        '&:hover': {
                            backgroundColor: 'var(--color-secondary-hover)',
                        },
                    },

                    '& .MuiPickersYear-yearButton.Mui-selected': {
                        backgroundColor: 'var(--color-secondary)',
                        color: 'var(--color-secondary-content)',
                    },
                    '& .MuiPickersYear-yearButton': {
                        color: 'var(--color-base-content)',
                    },

                    // Месяц (выделение)
                    '& .MuiPickersMonth-monthButton.Mui-selected': {
                        backgroundColor: 'var(--color-secondary)',
                        color: 'var(--color-secondary-content)',
                    },
                    '& .MuiPickersMonth-monthButton': {
                        color: 'var(--color-base-content)',
                    },
                }}
            />
        </LocalizationProvider></>)
}

const CustomDay = (props) => {
    const { day, outsideCurrentMonth, highlightedDates = [], ...other } = props;
    const isHighlighted = highlightedDates.some((highlightedDay) =>
        isSameDay(day, highlightedDay)
    );

    return (<>
        <Badge
            key={props.day.toString()}
            overlap="circular"
            badgeContent={isHighlighted ? '🔥' : undefined}
            sx={{
                '& .MuiBadge-badge': {
                    fontSize: '1rem',       // Увеличить размер эмоджи/текста
                    height: 10,             // Размер бейджа по высоте
                    minWidth: 10,           // Размер бейджа по ширине
                    position: 'absolute',
                    bottom: 0,
                    left: 0,    // Отступы внутри
                },
            }}
        >
            <PickersDay
                {...other}
                day={day}
                outsideCurrentMonth={outsideCurrentMonth}
                sx={{
                    fontSize: '0.8rem',  // Reduce the font size of the day text
                    height: 30,          // Adjust height of the day cell
                    width: 30,           // Adjust width of the day cell
                }}
            />
        </Badge>
    </>)
}

export default Calendar;