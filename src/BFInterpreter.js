function interpret(text) {

    var tape = Array(0xffff).fill(0);

    var stack = [];

    var log = [];

    var cur_idx = 0;

    var startTime = performance.now();

    for (var i = 0; i < text.length; i++) {
        if (performance.now() - startTime > 1000) {
            console.log("STOPPING");
            break;
        }
        switch (text[i]) {
            case '>': {
                cur_idx += 1;
                break;
            }
            case '<': {
                cur_idx -= 1;
                break;
            }
            case '+': {
                tape[cur_idx] += 1;
                if (tape[cur_idx] == 256) {
                    tape[cur_idx] = 0;
                }
                break;
            }
            case '-': {
                tape[cur_idx] -= 1;
                if (tape[cur_idx] < 0) {
                    tape[cur_idx] = 255;
                }
                break;
            }
            case '[': {
                stack.push(i);
                break;
            }
            case ']': {
                back = stack.pop();
                if (tape[cur_idx] != 0) {
                    i = back-1;
                }
                break;
            }
            case ',': {
                break;
            }
            case '.': {
                log += String.fromCharCode(tape[cur_idx]);
                break;
            }
            default: break;
        }
    }


    var new_text = "";
    for (var i = 0; i < 0xffff; i++) {
        if (i % 12 == 0) {
            new_text += '\n';
        }
        new_text += tape[i].toString(16).padStart(2, '0') + ' ';
    }

    document.getElementById("log").value = log;
    document.getElementById("mem").value = new_text;

}

document.getElementById("bf").value = "++++++++[>++++++++>++++++++<<-]>++.++++.+++.<++++++[>++++++<-]>+.++++++.>>++++++[>++++++<-]>[-<<+>>]<<+[>+>+<<-]>.+++++++++++++.--.++.>.<++.>.<--.>[-]++++[>++[>+++++<-]<-]>>[-<<<->>>]<<<.+++++++++.<+++++[<<++>>-]<<.>>>>++++[>++++[>++<-]<-]>>...>++++[>++++<-]>[-<<<<<->>>>>]<<<<<.<<--.-------------.>>[-]<<[->+>+<<]>----.>+++++++++++++++.<++++.-.<<.>>>>>>......<<++++++++[>++++++++>++++++++<<-]>++.<<+++++.<<<.>++++++++[>>>++[>>>++<<<-]<<<-]>>>>>>.<<<<<----------.>>>>+.[->>+>+<<<]>>++.<<<<++++[<---->-]<-.-------.>++++[<++++>-]<+.+++++++.>>>>.<++++[-<++++>]<.>++++[->>++++<<]>>++.--.."
interpret(document.getElementById("bf").value)

document.getElementById("bf").oninput = function() {
    var text = document.getElementById("bf").value;
    interpret(text);
}