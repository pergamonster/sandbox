
import java.io.File;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

/**
 * Created by pergriffiths on 18/03/2017.
 */

public class SandBox {

    public static void longWords(String strPath) throws IOException
    {
        String contents = new String(Files.readAllBytes(Paths.get(strPath)),StandardCharsets.UTF_8);
        List<String> words = Arrays.asList(contents.split("\\PL+"));

        long count =0;
        count = words.stream().filter(w->w.length()>12).count();
        System.out.println(count);
    }

    public static long email(String input){
        Pattern pattern = Pattern.compile(".*@gmail\\.com");

        return Stream.of(input)
                .filter(pattern.asPredicate())
                .count();
    }

    public static String reg(String input){
        return Pattern.compile(":")
                .splitAsStream(input)
                .filter(s -> s.contains("bar"))
                .sorted()
                .collect(Collectors.joining(":"));
    }

    public static void main(String[] args) {
        System.out.println(args[0]
                .chars()
                .distinct()
                .mapToObj(c -> String.valueOf((char) c))
                .sorted()
                .collect(Collectors.joining()));
        System.out.println(reg(args[0]));
        System.out.println(email("\"bob@gmail.com\", \"alice@hotmail.com\""));
        try {
            longWords("/Users/pergriffiths/test.py");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}