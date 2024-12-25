'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react'; // FullCalendar 컴포넌트
import dayGridPlugin from '@fullcalendar/daygrid'; // 월간 뷰 플러그인
import interactionPlugin from '@fullcalendar/interaction'; // 클릭 이벤트 플러그인

interface CalendarProps {
  onDateClick: (date: string) => void;
}

const Calendar = ({ onDateClick }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // 선택된 날짜 상태

  const handleDateClick = (info: { dateStr: string }) => {
    setSelectedDate(info.dateStr); // 선택된 날짜 업데이트
    onDateClick(info.dateStr); // 부모 컴포넌트에 선택된 날짜 전달
  };

  // 선택된 날짜에 스타일 적용
  const handleDayCellClassNames = (args: { date: Date }) => {
    // 날짜를 하루 빼기
    const adjustedDate = new Date(args.date); // 새로운 Date 객체 생성 (원본 수정 방지)
    adjustedDate.setDate(adjustedDate.getDate() + 1); // 하루 빼기

    // 날짜 비교
    if (selectedDate === adjustedDate.toISOString().split('T')[0]) {
      return 'selected-date'; // 선택된 날짜에 클래스 이름 추가
    }
    return '';
  };

  return (
    <CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        height="auto"
        locale="ko" // 한국어 설정
        dayCellClassNames={handleDayCellClassNames} // 날짜 셀에 클래스 추가
      />
    </CalendarContainer>
  );
};

export default Calendar;

const CalendarContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;

  /* 선택된 날짜의 배경색 스타일 */
  .selected-date {
    background-color: ${({ theme }) => theme.colors.selected};
    color: #fff;
    border-radius: 4px;
  }
`;
