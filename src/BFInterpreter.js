function interpret(text) {

    var tape = Array(0xffff).fill(0);

    var stack = [];

    var output = [];

    var cur_idx = 0;

    var startTime = performance.now();

    var left_count  = 0;
    var right_count = 0;
    var plus_count  = 0;
    var minus_count = 0;

    for (var i = 0; i < text.length; i++) {
        if (performance.now() - startTime > 1000) {
            console.log("STOPPING");
            break;
        }
        switch (text[i]) {
            case '>': {
                if(left_count != 0) {
                    cur_idx -= left_count;
                } else if(plus_count != 0) {
                    tape[cur_idx] += plus_count;
                } else if(minus_count != 0) {
                    tape[cur_idx] -= minus_count;
                }
                right_count++; left_count = 0;
                plus_count = 0; minus_count = 0;
                break;
            }
            case '<': {
                if(right_count != 0) {
                    cur_idx += left_count;
                } else if(plus_count != 0) {
                    tape[cur_idx] += plus_count;
                } else if(minus_count != 0) {
                    tape[cur_idx] -= minus_count;
                }
                right_count = 0; left_count++;
                plus_count = 0; minus_count = 0;
                break;
            }
            case '+': {
                if(right_count != 0) {
                    cur_idx += right_count;
                } else if(left_count != 0) {
                    cur_idx -= left_count;
                } else if(minus_count != 0) {
                    tape[cur_idx] -= minus_count;
                }
                right_count = 0; left_count = 0;
                plus_count++; minus_count = 0;
                break;
            }
            case '-': {
                if(right_count != 0) {
                    cur_idx += right_count;
                } else if(left_count != 0) {
                    cur_idx -= left_count;
                } else if(plus_count != 0) {
                    tape[cur_idx] += plus_count;
                }
                right_count = 0; left_count = 0;
                plus_count = 0; minus_count++;
                break;
            }
            case '[': {
                if(right_count != 0) {
                    cur_idx += right_count;
                } else if(left_count != 0) {
                    cur_idx -= left_count;
                } else if (plus_count != 0) {
                    tape[cur_idx] += plus_count;
                } else if(minus_count != 0) {
                    tape[cur_idx] -= minus_count;
                }
                right_count = 0; left_count = 0;
                plus_count = 0; minus_count = 0;
                stack.push(i);
                break;
            }
            case ']': {
                if(right_count != 0) {
                    cur_idx += right_count;
                } else if(left_count != 0) {
                    cur_idx -= left_count;
                } else if (plus_count != 0) {
                    tape[cur_idx] += plus_count;
                } else if(minus_count != 0) {
                    tape[cur_idx] -= minus_count;
                }
                right_count = 0; left_count = 0;
                plus_count = 0; minus_count = 0;
                back = stack.pop();
                if (tape[cur_idx] != 0) {
                    i = back-1;
                }
                break;
            }
            case ',': {
                if(right_count != 0) {
                    cur_idx += right_count;
                } else if(left_count != 0) {
                    cur_idx -= left_count;
                } else if (plus_count != 0) {
                    tape[cur_idx] += plus_count;
                } else if(minus_count != 0) {
                    tape[cur_idx] -= minus_count;
                }
                right_count = 0; left_count = 0;
                plus_count = 0; minus_count = 0;
                break;
            }
            case '.': {
                if(right_count != 0) {
                    cur_idx += right_count;
                } else if(left_count != 0) {
                    cur_idx -= left_count;
                } else if (plus_count != 0) {
                    tape[cur_idx] += plus_count;
                } else if(minus_count != 0) {
                    tape[cur_idx] -= minus_count;
                }
                right_count = 0; left_count = 0;
                plus_count = 0; minus_count = 0;
                output += String.fromCharCode(tape[cur_idx]);
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

    document.getElementById("output").value = output;
    document.getElementById("mem").value = new_text;

}

document.getElementById("bf").value = "++++++++[>++++++++>++++++++<<-]>++.++++.+++.<++++++[>++++++<-]>+.++++++.>>++++++[>++++++<-]>[-<<+>>]<<+[>+>+<<-]>.+++++++++++++.--.++.>.<++.>.<--.>[-]++++[>++[>+++++<-]<-]>>[-<<<->>>]<<<.+++++++++.<+++++[<<++>>-]<<.>>>>++++[>++++[>++<-]<-]>>...>++++[>++++<-]>[-<<<<<->>>>>]<<<<<.<<--.-------------.>>[-]<<[->+>+<<]>----.>+++++++++++++++.<++++.-.<<.>>>>>>......<<++++++++[>++++++++>++++++++<<-]>++.<<+++++.<<<.>++++++++[>>>++[>>>++<<<-]<<<-]>>>>>>.<<<<<----------.>>>>+.[->>+>+<<<]>>++.<<<<++++[<---->-]<-.-------.>++++[<++++>-]<+.+++++++.>>>>.<++++[-<++++>]<.>++++[->>++++<<]>>++.--.."
interpret(document.getElementById("bf").value)

document.getElementById("bf").oninput = function() {
    var text = document.getElementById("bf").value;
    interpret(text);
}