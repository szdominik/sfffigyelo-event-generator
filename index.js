$(() => {
  $('#generatorForm').on('submit', (e) => {
    document.documentElement.scrollTop = 0;
    e.preventDefault();
    $('#addCalendarBtn').prop('disabled', false);
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

    let result = `<b>Időpont:</b> ${datas.date}<br /><br />`;
    result += `<b>Helyszín: </b><a href="${datas.maps}">${datas.address}</a> (${datas.location})<br /><br />`;

    if (datas.fbEvent !== '') {
      result += `<a href="${datas.fbEvent}">Facebook-esemény</a><br /><br />`;
    }
    
    if (datas.otherLink !== '') {
      result += `<a href="${datas.otherLink}">További információ</a><br /><br />`;
    }

    result += `<div style='text-align: justify;'>${datas.details}</div>`
    
    $('#resultArea').prop('value', result);
  });
});
