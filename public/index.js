$(() => {
  const generatePostText = datas => {
    const newLine = '<br /><br />';
    let result = `<b>Időpont:</b> ${datas.date}${newLine}`;
    result += `<b>Helyszín: </b><a href="${datas.maps}">${datas.address}</a> (${datas.location})${newLine}`;

    if (datas.fbEvent !== '') {
      result += `<a href="${datas.fbEvent}">Facebook-esemény</a>${newLine}`;
    }
    
    if (datas.otherLink !== '') {
      result += `<a href="${datas.otherLink}">További információ</a>${newLine}`;
    }

    const details = datas.details.split('\n').reduce((acc, val) => {
      if(val === '') return acc + newLine;
      return acc + val;
    }, '');
    result += `<div style='text-align: justify;'>"${details}"</div>`;

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

    link += `&details="${datas.details}"`;

    if (datas.fbEvent) {
      link += `\n\n${datas.fbEvent}`;
    }
    if (datas.otherLink) {
      link += `\n\n${datas.otherLink}`;
    }

    link += `&location=${datas.location}, ${datas.address}`;
    link += '&sprop=http://sfffigyelo.blogspot.hu';
    return encodeURI(link);
  };

  $('#generatorForm').on('submit', (e) => {
    document.documentElement.scrollTop = 0;
    e.preventDefault();
    $('#addCalendarBtn').removeClass('disabled', false);
    $('#resultArea').prop('disabled', false);

    const datas = {
      title: $('[name="title"]').val().trim(),
      date: $('[name="date"]').val().trim(),
      location: $('[name="location"]').val().trim(),
      maps: $('[name="maps"]').val().trim(),
      address: $('[name="address"]').val().trim(),
      fbEvent: $('[name="fb-event"]').val().trim(),
      otherLink: $('[name="other-link"]').val().trim(),
      details: $('[name="details"]').val().trim(),
    };
    
    $('#resultArea').prop('value', generatePostText(datas));
    $('#addCalendarBtn').prop('href', generateCalendarLink(datas));
  });
});
