$(() => {
  const generatePostText = datas => {
    let result = `<b>Időpont:</b> ${datas.date}<br /><br />`;
    result += `<b>Helyszín: </b><a href="${datas.maps}">${datas.address}</a> (${datas.location})<br /><br />`;

    if (datas.fbEvent !== '') {
      result += `<a href="${datas.fbEvent}">Facebook-esemény</a><br /><br />`;
    }
    
    if (datas.otherLink !== '') {
      result += `<a href="${datas.otherLink}">További információ</a><br /><br />`;
    }

    result += `<div style='text-align: justify;'>"${datas.details}"</div>`;

    return result;
  };

  const formatTimes = timeString =>
    moment(timeString, 'HH:mm').subtract(1, 'hours').format('HHmmss');

  const generateCalendarLink = datas => {
    let link = 'http://www.google.com/calendar/event?action=TEMPLATE';
    link += `&text=${datas.title}`;

    moment.locale('hu');
    const date = moment(datas.date, 'YYYY MMMM DD').format('YYYYMMDD');
    const startTime = formatTimes(datas.date.substr(datas.date.indexOf(':') - 2, 5));
    const endTime = formatTimes(datas.date.substr(datas.date.indexOf('-') + 1, 5));
    link += `&dates=${date}T${startTime}Z/${date}T${endTime}Z`;

    link += `&details=${datas.details}`;

    if (datas.fbEvent) {
      link += ` ${datas.fbEvent}`;
    }

    link += `&location=${datas.location}, ${datas.address}`;
    link += '&sprop=http://sfffigyelo.blogspot.hu';
    return link;
  };

  $('#generatorForm').on('submit', (e) => {
    document.documentElement.scrollTop = 0;
    e.preventDefault();
    $('#addCalendarBtn').removeClass('disabled', false);
    $('#resultArea').prop('disabled', false);

    const datas = {
      title: $('[name="title"]').val(),
      date: $('[name="date"]').val(),
      location: $('[name="location"]').val(),
      maps: $('[name="maps"]').val(),
      address: $('[name="address"]').val(),
      fbEvent: $('[name="fb-event"]').val(),
      otherLink: $('[name="other-link"]').val(),
      details: $('[name="details"]').val(),
    };
    
    $('#resultArea').prop('value', generatePostText(datas));
    $('#addCalendarBtn').prop('href', generateCalendarLink(datas));
  });
});
