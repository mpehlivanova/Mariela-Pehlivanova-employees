 function fineMax (arr)  {
    let max = 0;
    let arrMax = [];
    let maxObj = {};
    arr.forEach((el) => {
      if (Number(el.WorkDays) > max) {
        max = el.WorkDays;
        maxObj = el;
      }
    });
    arrMax.push(maxObj);

    return arrMax;
  };
  function getMaxDays(start, end)  {
    let dateStart = start.split("-");
    let dateEnd = end.split("-");
    let date1 = new Date(dateStart[0], dateStart[1], dateStart[2]);
    let date2 = new Date(dateEnd[0], dateEnd[1], dateEnd[2]);
    let date1Unixtime = parseInt(date1.getTime() / 1000);
    let date2Unixtime = parseInt(date2.getTime() / 1000);
    let timeDifference = date2Unixtime - date1Unixtime;
    let timeDifferenceInHours = timeDifference / 60 / 60;
    var timeDifferenceInDays = timeDifferenceInHours / 24;

    return parseInt(timeDifferenceInDays);
  };
  function createPropertyWorkDays (arr) {
    let today = new Date();
    let day =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let newArr = [];
    arr.map((el) => {
      if (`${el.DateTo}` === "NULL") {
        el.DateTo = day;
      }
      if (`${el.DateFrom}` === "NULL") {
        el.DateFrom = day;
      }

      let maxDay = getMaxDays(el.DateFrom, el.DateTo);
      el.WorkDays = `${maxDay}`;
      return newArr.push(el);
    });
    return newArr;
  };

  export {fineMax, getMaxDays, createPropertyWorkDays}