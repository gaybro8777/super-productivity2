import * as moment from 'moment';
import {Injectable} from '@angular/core';

@Injectable()
export class ParseDurationService {
  fromString(strValue) {
    if (!strValue) {
      return;
    }

    let days;
    let hours;
    let minutes;
    let seconds;
    let momentVal;
    let isValid;

    const arrValue = strValue.split(' ');

    arrValue.forEach((val) => {
      if (val.length > 0) {
        const lastChar = val.slice(-1);
        const amount = parseInt(val.slice(0, val.length - 1), 10);

        if (lastChar === 's') {
          seconds = amount;
        }
        if (lastChar === 'm') {
          minutes = amount;
        }
        if (lastChar === 'h') {
          hours = amount;
        }
        if (lastChar === 'd') {
          days = amount;
        }
      }
    });
    isValid = seconds || minutes || hours || days || false;

    if (isValid) {
      momentVal = moment.duration({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });

      if (momentVal.asSeconds() > 0) {
        return momentVal;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  toString(momentDuration) {
    const md = Object.assign({}, momentDuration);
    let val;

    if (md) {
      // if moment duration object
      if (md.duration || md._milliseconds) {

        const dd = md.duration && md.duration()._data || md._data;
        val = '';
        val += parseInt(dd.days, 10) > 0 && (dd.days + 'd ') || '';
        val += parseInt(dd.hours, 10) > 0 && (dd.hours + 'h ') || '';
        val += parseInt(dd.minutes, 10) > 0 && (dd.minutes + 'm ') || '';
        val += parseInt(dd.seconds, 10) > 0 && (dd.seconds + 's ') || '';
        val = val.trim();

        // if moment duration string
      } else if (md.replace) {
        val = val.replace('PT', '');
        val = val.toLowerCase(val);
        val = val.replace(/(d|h|m|s)/g, '$1 ');
        val = val.trim();
      }
    }

    return val;
  }
}
