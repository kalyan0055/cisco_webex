 
 
function connect() {
  if (!spark) {
    spark = ciscospark.init({
      config: {
        phone: {
          enableExperimentalGroupCallingSupport: true
        }
      },
      credentials: {
        access_token: document.getElementById('access-token').value
      }
    });
  }

  if (!spark.phone.registered) {
     spark.phone.on('call:incoming', (call) => {
      Promise.resolve()
        .then(() => {
          if (call.from && call.from.personId) {
            return spark.people.get(call.from.personId);
          }

          return Promise.resolve();
        })
        .then((person) => {
          const str = person ? `Anwser incoming call from ${person.displayName}` : 'Answer incoming call';

          if (confirm(str)) {
            call.answer();
            bindCallEvents(call);
          }
          else {
            call.decline();
          }
        })
        .catch((err) => {
          console.error(err);
          alert(err);
        });
    });

    return spark.phone.register()
      .then(() => {
        // document.body.classList.add('listening');

        // document.getElementById('connection-status').innerHTML = 'connected';
      })
      .catch((err) => {
        console.error(err);
        alert(err.stack);
        throw err;
      });
  }

  return Promise.resolve();
}


function bindCallEvents(call) {
  call.on('error', (err) => {
    console.error(err);
    alert(err.stack);
  });
  call.once('localMediaStream:change', () => {
    // document.getElementById('self-view').srcObject = call.localMediaStream;
  });

  call.on('remoteMediaStream:change', () => {
    [
      'audio',
      'video'
    ].forEach((kind) => {
      if (call.remoteMediaStream) {
        const track = call.remoteMediaStream.getTracks().find((t) => t.kind === kind);

        if (track) {
        //   document.getElementById(`remote-view-${kind}`).srcObject = new MediaStream([track]);
        }
      }
    });
  });

  // Once the call ends, we'll want to clean up our UI a bit
  call.on('inactive', () => {
    // Remove the streams from the UI elements
    // document.getElementById('self-view').srcObject = undefined;
    // document.getElementById('remote-view-audio').srcObject = undefined;
    // document.getElementById('remote-view-video').srcObject = undefined;
  });

  // Of course, we'd also like to be able to end the call:
  document.getElementById('hangup').addEventListener('click', () => {
    call.hangup();
  });
}

// Now, let's set up incoming call handling
document.getElementById('credentials').addEventListener('submit', (event) => {
  // let's make sure we don't reload the page when we submit the form
  event.preventDefault();

  // The rest of the incoming call setup happens in connect();
  connect();
});

// And finally, let's wire up dialing
document.getElementById('dialer').addEventListener('submit', (event) => {
  // again, we don't want to reload when we try to dial
  event.preventDefault();

  // we'll use `connect()` (even though we might already be connected or
  // connecting) to make sure we've got a functional spark instance.

  connect()
    .then(() => {
      const call = spark.phone.dial(document.getElementById('invitee').value);

      // Call our helper function for binding events to calls
      bindCallEvents(call);
    });
  // ignore the catch case since we reported the error above and practical error
  // handling is out of the scope this sample
});