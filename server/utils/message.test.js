const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('show generate correct message object', () => {
    var from = 'david';
    var text = 'msg text';

    var msg = generateMessage(from, text);

    expect(msg.from).toBe(from);
    expect(msg.text).toBe(text);
    expect(msg).toInclude({from, text});
    expect(msg.createdAt).toBeA('number');

  });
});
