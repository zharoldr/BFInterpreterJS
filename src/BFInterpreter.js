function genJS(text) {

    var JSCode = "function exec(){var a = new Uint8Array(0xffff).fill(0); var p = 0; var o=\"\";";

    var left_count  = 0;
    var right_count = 0;
    var plus_count  = 0;
    var minus_count = 0;

    for (var i = 0; i < text.length; i++) {
        switch (text[i]) {
            case '>': {
                if(left_count != 0) {
                    JSCode += "p-="+left_count+";"
                } else if(plus_count != 0) {
                    JSCode += "a[p]+="+plus_count+";"
                } else if(minus_count != 0) {
                    JSCode += "a[p]-="+minus_count+";"
                }
                right_count++; left_count = 0;
                plus_count = 0; minus_count = 0;
                break;
            }
            case '<': {
                if(right_count != 0) {
                    JSCode += "p+="+right_count+";"
                } else if(plus_count != 0) {
                    JSCode += "a[p]+="+plus_count+";"
                } else if(minus_count != 0) {
                    JSCode += "a[p]-="+minus_count+";"
                }
                right_count = 0; left_count++;
                plus_count = 0; minus_count = 0;
                break;
            }
            case '+': {
                if(right_count != 0) {
                    JSCode += "p+="+right_count+";"
                } else if(left_count != 0) {
                    JSCode += "p-="+left_count+";"
                } else if(minus_count != 0) {
                    JSCode += "a[p]-="+minus_count+";"
                }
                right_count = 0; left_count = 0;
                plus_count++; minus_count = 0;
                break;
            }
            case '-': {
                if(right_count != 0) {
                    JSCode += "p+="+right_count+";"
                } else if(left_count != 0) {
                    JSCode += "p-="+left_count+";"
                } else if(plus_count != 0) {
                    JSCode += "a[p]+="+plus_count+";"
                }
                right_count = 0; left_count = 0;
                plus_count = 0; minus_count++;
                break;
            }
            case '[': {
                if(right_count != 0) {
                    JSCode += "p+="+right_count+";"
                } else if(left_count != 0) {
                    JSCode += "p-="+left_count+";"
                } else if (plus_count != 0) {
                    JSCode += "a[p]+="+plus_count+";"
                } else if(minus_count != 0) {
                    JSCode += "a[p]-="+minus_count+";"
                }
                JSCode += "while (a[p] != 0) {";
                right_count = 0; left_count = 0;
                plus_count = 0; minus_count = 0;
                break;
            }
            case ']': {
                if(right_count != 0) {
                    JSCode += "p+="+right_count+";"
                } else if(left_count != 0) {
                    JSCode += "p-="+left_count+";"
                } else if (plus_count != 0) {
                    JSCode += "a[p]+="+plus_count+";"
                } else if(minus_count != 0) {
                    JSCode += "a[p]-="+minus_count+";"
                }
                JSCode += "}";
                right_count = 0; left_count = 0;
                plus_count = 0; minus_count = 0;
                break;
            }
            case ',': {
                if(right_count != 0) {
                    JSCode += "p+="+right_count+";"
                } else if(left_count != 0) {
                    JSCode += "p-="+left_count+";"
                } else if (plus_count != 0) {
                    JSCode += "a[p]+="+plus_count+";"
                } else if(minus_count != 0) {
                    JSCode += "a[p]-="+minus_count+";"
                }
                right_count = 0; left_count = 0;
                plus_count = 0; minus_count = 0;
                break;
            }
            case '.': {
                if(right_count != 0) {
                    JSCode += "p+="+right_count+";"
                } else if(left_count != 0) {
                    JSCode += "p-="+left_count+";"
                } else if (plus_count != 0) {
                    JSCode += "a[p]+="+plus_count+";"
                } else if(minus_count != 0) {
                    JSCode += "a[p]-="+minus_count+";"
                }
                JSCode += "o += a[p];";
                right_count = 0; left_count = 0;
                plus_count = 0; minus_count = 0;
                break;
            }
            default: {
                if(right_count != 0) {
                    JSCode += "p+="+right_count+";"
                } else if(left_count != 0) {
                    JSCode += "p-="+left_count+";"
                } else if (plus_count != 0) {
                    JSCode += "a[p]+="+plus_count+";"
                } else if(minus_count != 0) {
                    JSCode += "a[p]-="+minus_count+";"
                }
                right_count = 0; left_count = 0;
                plus_count = 0; minus_count = 0;
                break;
            }
        }
    }

    if(right_count != 0) {
        JSCode += "p+="+right_count+";"
    } else if(left_count != 0) {
        JSCode += "p-="+left_count+";"
    } else if (plus_count != 0) {
        JSCode += "a[p]+="+plus_count+";"
    } else if(minus_count != 0) {
        JSCode += "a[p]-="+minus_count+";"
    }
    right_count = 0; left_count = 0;
    plus_count = 0; minus_count = 0;

    JSCode += "var mem_log = \"\";for (var i = 0; i < 0xffff; i++) {if (i % 12 == 0) {mem_log += '\\n';}mem_log += a[i].toString(16).padStart(2, '0') + ' ';}return mem_log, o}";

    console.log(JSCode);

    return JSCode;
}

document.getElementById("bf").value = "++++++++[>++++++++>++++++++<<-]>++.++++.+++.<++++++[>++++++<-]>+.++++++.>>++++++[>++++++<-]>[-<<+>>]<<+[>+>+<<-]>.+++++++++++++.--.++.>.<++.>.<--.>[-]++++[>++[>+++++<-]<-]>>[-<<<->>>]<<<.+++++++++.<+++++[<<++>>-]<<.>>>>++++[>++++[>++<-]<-]>>...>++++[>++++<-]>[-<<<<<->>>>>]<<<<<.<<--.-------------.>>[-]<<[->+>+<<]>----.>+++++++++++++++.<++++.-.<<.>>>>>>......<<++++++++[>++++++++>++++++++<<-]>++.<<+++++.<<<.>++++++++[>>>++[>>>++<<<-]<<<-]>>>>>>.<<<<<----------.>>>>+.[->>+>+<<<]>>++.<<<<++++[<---->-]<-.-------.>++++[<++++>-]<+.+++++++.>>>>.<++++[-<++++>]<.>++++[->>++++<<]>>++.--.."
// document.getElementById("bf").value = "+>[-]<[->>+<<]>>[-<+<+>>][-]<<[->>>>>+<<<<<]>>>>>[-<<+<<<+>>>>>][-]<<<<[->>>>+<<<<]>>>>[-<+<<<+>>>>][-]<<<[-]>[-<+>]>[-<<+>>]<[-]>[-]<<<[->>>>>+<<<<<]>>>>>[-<<+<<<+>>>>>][-]<<<<[->>>>+<<<<]>>>>[-<+<<<+>>>>][-]<<<[-]>[-<+>]>[-<<+>>]<[-]>[-]<<<[->>>>>+<<<<<]>>>>>[-<<+<<<+>>>>>][-]<<<<[->>>>+<<<<]>>>>[-<+<<<+>>>>][-]<<<[-]>[-<+>]>[-<<+>>]<[-]>[-]<<<[->>>>>+<<<<<]>>>>>[-<<+<<<+>>>>>][-]<<<<[->>>>+<<<<]>>>>[-<+<<<+>>>>][-]<<<[-]>[-<+>]>[-<<+>>]<[-]>[-]<<<[->>>>>+<<<<<]>>>>>[-<<+<<<+>>>>>][-]<<<<[->>>>+<<<<]>>>>[-<+<<<+>>>>][-]<<<[-]>[-<+>]>[-<<+>>]<[-]>[-]<<<[->>>>>+<<<<<]>>>>>[-<<+<<<+>>>>>][-]<<<<[->>>>+<<<<]>>>>[-<+<<<+>>>>][-]<<<[-]>[-<+>]>[-<<+>>]<[-]>[-]<<<[->>>>>+<<<<<]>>>>>[-<<+<<<+>>>>>][-]<<<<[->>>>+<<<<]>>>>[-<+<<<+>>>>][-]<<<[-]>[-<+>]>[-<<+>>]<[-]>[-]<<<[->>>>>+<<<<<]>>>>>[-<<+<<<+>>>>>][-]<<<<[->>>>+<<<<]>>>>[-<+<<<+>>>>][-]<<<[-]>[-<+>]>[-<<+>>]<[-]>[-]<<<[->>>>>+<<<<<]>>>>>[-<<+<<<+>>>>>][-]<<<<[->>>>+<<<<]>>>>[-<+<<<+>>>>][-]<<<[-]>[-<+>]>[-<<+>>]<[-]>[-]<<<[->>>>>+<<<<<]>>>>>[-<<+<<<+>>>>>][-]<<<<[->>>>+<<<<]>>>>[-<+<<<+>>>>][-]<<<[-]>[-<+>]>[-<<+>>]<[-]>[-]<<<[->>>>>+<<<<<]>>>>>[-<<+<<<+>>>>>][-]<<<<[->>>>+<<<<]>>>>[-<+<<<+>>>>][-]<<<[-]>[-<+>]>[-<<+>>]<[-]>[-]<<"
genJS(document.getElementById("bf").value)
var mem_log, o = JSExec();
document.getElementById("mem").value = mem_log;
document.getElementById("output").value = o;

document.getElementById("bf").oninput = function() {
    var text = document.getElementById("bf").value;
    var JSExec = Function(genJS(text));

    mem_log, o = JSExec();

    console.log("-->"+o);

    document.getElementById("mem").value = mem_log;
    document.getElementById("output").value = o;
}