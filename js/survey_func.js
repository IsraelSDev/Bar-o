//Js obfuscated to avoid copy

jQuery(function(_0x5779x1) {
    'use strict';
    _0x5779x1('form#wrapped')['attr']('action', './save_data.php');
    _0x5779x1('#wizard_container')['wizard']({
        stepsWrapper: '#wrapped',
        submit: '.submit',
        beforeSelect: function(_0x5779x4, _0x5779x5) {
            if (_0x5779x1('input#website')['val']()['length'] != 0) {
                return false
            };
            if (!_0x5779x5['isMovingForward']) {
                return true
            };
            var _0x5779x6 = _0x5779x1(this)['wizard']('state')['step']['find'](':input');
            return !_0x5779x6['length'] || !!_0x5779x6['valid']()
        }
    })['validate']({
        errorPlacement: function(_0x5779x2, _0x5779x3) {
            if (_0x5779x3['is'](':radio') || _0x5779x3['is'](':checkbox')) {
                _0x5779x2['insertBefore'](_0x5779x3['next']())
            } else {
                _0x5779x2['insertAfter'](_0x5779x3)
            }
        }
    });
    _0x5779x1('#progressbar')['progressbar']();
    _0x5779x1('#wizard_container')['wizard']({
        afterSelect: function(_0x5779x4, _0x5779x5) {
            _0x5779x1('#progressbar')['progressbar']('value', _0x5779x5['percentComplete']);
            _0x5779x1('#location')['text']('(' + _0x5779x5['stepsComplete'] + '/' + _0x5779x5['stepsPossible'] + ')')
        }
    });
    _0x5779x1('#wrapped')['validate']({
        ignore: [],
        rules: {
            select: {
                required: true
            }
        },
        errorPlacement: function(_0x5779x2, _0x5779x3) {
            if (_0x5779x3['is']('select:hidden')) {
                _0x5779x2['insertAfter'](_0x5779x3['next']('.nice-select'))
            } else {
                _0x5779x2['insertAfter'](_0x5779x3)
            }
        }
    })
});

function getVals(_0x5779x8, _0x5779x9) {
    switch (_0x5779x9) {
        case 'question_1':
            var _0x5779xa = $(_0x5779x8)['val']();
            $('#question_1')['text'](_0x5779xa);
            break;
        case 'additional_message':
            var _0x5779xa = $(_0x5779x8)['val']();
            $('#additional_message')['text'](_0x5779xa);
            break;
        case 'question_2':
            var _0x5779xa = $(_0x5779x8)['val']();
            $('#question_2')['text'](_0x5779xa);
            break;
        case 'additional_message_2':
            var _0x5779xa = $(_0x5779x8)['val']();
            $('#additional_message_2')['text'](_0x5779xa);
            break;
        case 'question_3':
            var _0x5779xb = $(_0x5779x8)['attr']('name');
            var _0x5779xa = [];
            $('input[name*=\'' + _0x5779xb + '\']')['each'](function() {
                if (jQuery(this)['is'](':checked')) {
                    _0x5779xa['push']($(this)['val']())
                }
            });
            $('#question_3')['text'](_0x5779xa['join'](', '));
            break
    }
}
